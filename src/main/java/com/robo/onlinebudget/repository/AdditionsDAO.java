package com.robo.onlinebudget.repository;

import com.robo.onlinebudget.entity.AnalysisListEntity;
import com.robo.onlinebudget.entity.NotesEntity;
import com.robo.onlinebudget.form.SaveAnalysis;
import com.robo.onlinebudget.form.SaveNote;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
@SuppressWarnings("unchecked")
public class AdditionsDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public AdditionsDAO() {
    }

    public List getNotes() {
        String hql = "FROM "
                + NotesEntity.class.getName();

        return sessionFactory.getCurrentSession()
                .createQuery(hql)
                .list();
    }

    public void muteNote(Long id) {
        Query query = sessionFactory.getCurrentSession()
                .createQuery("FROM "
                        + NotesEntity.class.getName()
                        + " WHERE id = :id");

        NotesEntity ne = (NotesEntity) query.setParameter("id", id).getSingleResult();

        ne.setDate(ne.getDate());
        ne.setText(ne.getText());
        ne.setRemind(!ne.getRemind());

        sessionFactory.getCurrentSession().update(ne);
    }

    public void addNote(SaveNote addNote) {
        NotesEntity ne = new NotesEntity();

        ne.setDate(Optional.ofNullable(addNote.getDate())
                .filter(date -> !date.isEmpty())
                .orElse(LocalDate.now().getYear()
                        + "-" + LocalDate.now().getMonthValue()
                        + "-" + LocalDate.now().getDayOfMonth()));

        ne.setText(Optional.ofNullable(addNote.getText())
                .filter(text -> !text.isEmpty())
                .orElse("[Sample Text]"));

        ne.setStuckSpendId(addNote.getStuckSpendId());

        ne.setRemind(!Optional.ofNullable(addNote.getStuckSpendId()).isPresent() && addNote.getRemind()); // !!!!!!!!!!!!!!!???????????????

        sessionFactory.getCurrentSession().save(ne);
    }

    public void delNote(Long id) {
        String hql = "DELETE "
                + NotesEntity.class.getName()
                + " WHERE id = :id";

        sessionFactory.getCurrentSession()
                .createQuery(hql)
                .setParameter("id", id)
                .executeUpdate();
    }

    public void saveNote(SaveNote saveNote) {
        String hql = "FROM "
                + NotesEntity.class.getName()
                + " AS we WHERE id = "
                + saveNote.getId() + "";

        NotesEntity ne = sessionFactory.getCurrentSession()
                .createQuery(hql, NotesEntity.class)
                .getSingleResult();

        ne.setDate(Optional.ofNullable(saveNote.getDate())
                .filter(date -> !date.isEmpty())
                .orElse(ne.getDate()));

        ne.setText(Optional.ofNullable(saveNote.getText())
                .filter(text -> !text.isEmpty())
                .orElse(ne.getText()));

        ne.setStuckSpendId(Optional.ofNullable(saveNote.getStuckSpendId())
                .orElse(ne.getStuckSpendId()));

        ne.setRemind(saveNote.getRemind());

        sessionFactory.getCurrentSession().update(ne);
    }

    //MEDICINE

    public List getAnalysisList() {
        String hql = "FROM "
                + AnalysisListEntity.class.getName();

        return sessionFactory.getCurrentSession()
                .createQuery(hql)
                .list();
    }

    public void delAnalysisFromList(Long id) {
        String hql = "DELETE "
                + AnalysisListEntity.class.getName()
                + " WHERE id = :id";

        sessionFactory.getCurrentSession()
                .createQuery(hql)
                .setParameter("id", id)
                .executeUpdate();
    }

    public void addAnalysis(SaveAnalysis saveAnalysis) {
        AnalysisListEntity ale = new AnalysisListEntity();

        ale.setName(Optional.ofNullable(saveAnalysis.getName())
                .filter(text -> !text.isEmpty())
                .orElse(null));

        ale.setPrice(saveAnalysis.getPrice() * saveAnalysis.getPersons());
        ale.setPersons(saveAnalysis.getPersons());

        sessionFactory.getCurrentSession().save(ale);
    }

    public void saveAnalysis(SaveAnalysis saveAnalysis) {
        String hql = "FROM "
                + AnalysisListEntity.class.getName()
                + " AS we WHERE id = "
                + saveAnalysis.getId();

        AnalysisListEntity ale = sessionFactory.getCurrentSession()
                .createQuery(hql, AnalysisListEntity.class)
                .getSingleResult();

        ale.setName(saveAnalysis.getName());
        ale.setPrice(saveAnalysis.getPrice());
        ale.setPersons(saveAnalysis.getPersons());

        sessionFactory.getCurrentSession().update(ale);
    }

}
