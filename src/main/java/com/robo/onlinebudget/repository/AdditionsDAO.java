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

@Repository
@Transactional
public class AdditionsDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public AdditionsDAO() {
    }

    public List getNotes() {
        String hql = "FROM " + NotesEntity.class.getName();
        List<NotesEntity> list = sessionFactory.getCurrentSession().createQuery(hql).list();
        return list;
    }

    public void muteNote(Long id) {
        Query query = sessionFactory.getCurrentSession().createQuery("FROM " + NotesEntity.class.getName() + " WHERE id = :id");
        NotesEntity ne = (NotesEntity) query.setParameter("id", id).getSingleResult();

        String date = ne.getDate();
        String text = ne.getText();

        ne.setDate(date);
        ne.setText(text);
        if (ne.getRemind() == false) {
            ne.setRemind(true);
        } else ne.setRemind(false);
        sessionFactory.getCurrentSession().update(ne);
    }

    public void addNote(SaveNote addNote) {
        NotesEntity ne = new NotesEntity();

        if (addNote.getDate() == null || addNote.getDate().isEmpty() || addNote.getDate().length() > 0) {
            String formattedDate = LocalDate.now().getYear() + "-" + LocalDate.now().getMonthValue() + "-" + LocalDate.now().getDayOfMonth();
            ne.setDate(formattedDate);
        } else {
            ne.setDate(addNote.getDate());
        }

        if (addNote.getText() == null) {
            ne.setText("[Sample Text]");
        } else {
            ne.setText(addNote.getText());
        }

        ne.setStuckSpendId(addNote.getStuckSpendId());
        System.out.println(" / / / addNote.getStuckSpendId() : " + addNote.getStuckSpendId());

        if (addNote.getStuckSpendId() != null) {
            ne.setRemind(false);
        } else ne.setRemind(addNote.getRemind());

        sessionFactory.getCurrentSession().save(ne);
    }

    public void delNote(Long id) {
        String hql = "DELETE " + NotesEntity.class.getName() + " WHERE id = :id";
        Query q = sessionFactory.getCurrentSession().createQuery(hql).setParameter("id", id);
        q.executeUpdate();
    }

    public void saveNote(SaveNote saveNote) {
        String hql = "FROM " + NotesEntity.class.getName() + " AS we WHERE id = " + saveNote.getId() + "";

        NotesEntity ne = sessionFactory.getCurrentSession().createQuery(hql, NotesEntity.class).getSingleResult();

        if (saveNote.getDate() == null || saveNote.getDate().isEmpty() || saveNote.getDate().length() > 0) {
            ne.setDate(ne.getDate());
        } else ne.setDate(saveNote.getDate());

        if (saveNote.getText().isEmpty()) {
            ne.setText(ne.getText());
        } else ne.setText(saveNote.getText());

        if (saveNote.getStuckSpendId() == null) {
            ne.setStuckSpendId(ne.getStuckSpendId());
        } else ne.setStuckSpendId(saveNote.getStuckSpendId());

        ne.setRemind(saveNote.getRemind());

        sessionFactory.getCurrentSession().update(ne);
    }

    //MEDICINE

    public List getAnalysisList() {
        String hql = "FROM " + AnalysisListEntity.class.getName();
        List<AnalysisListEntity> list = sessionFactory.getCurrentSession().createQuery(hql).list();
        return list;
    }

    public void delAnalysisFromList(Long id) {
        String hql = "DELETE " + AnalysisListEntity.class.getName() + " WHERE id = :id";
        Query q = sessionFactory.getCurrentSession().createQuery(hql).setParameter("id", id);
        q.executeUpdate();
    }

    public void addAnalysis(SaveAnalysis saveAnalysis) throws Exception {
        AnalysisListEntity ale = new AnalysisListEntity();

        if (saveAnalysis.getName() == null) {
            throw new Exception("name must not be empty");
        }

        ale.setName(saveAnalysis.getName());
        ale.setPrice(saveAnalysis.getPrice() * saveAnalysis.getPersons());
        ale.setPersons(saveAnalysis.getPersons());

        sessionFactory.getCurrentSession().save(ale);
    }

    public void saveAnalysis(SaveAnalysis saveAnalysis) {
        String hql = "FROM " + AnalysisListEntity.class.getName() + " AS we WHERE id = " + saveAnalysis.getId() + "";

        AnalysisListEntity ale = sessionFactory.getCurrentSession().createQuery(hql, AnalysisListEntity.class).getSingleResult();

        ale.setName(saveAnalysis.getName());
        ale.setPrice(saveAnalysis.getPrice());
        ale.setPersons(saveAnalysis.getPersons());

        sessionFactory.getCurrentSession().update(ale);
    }

}
