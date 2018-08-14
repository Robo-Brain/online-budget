package com.robo.helloworld.repository;

import com.robo.helloworld.entity.NotesEntity;
import com.robo.helloworld.form.SaveNote;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
        boolean isRemind = ne.isRemind();

        ne.setDate(date);
        ne.setText(text);
        ne.setRemind(isRemind);
        ne.setMuted(true);
        sessionFactory.getCurrentSession().update(ne);
    }

    public void addNote(SaveNote addNote) {
        NotesEntity ne = new NotesEntity();

        ne.setDate(addNote.getDate());
        ne.setText(addNote.getText());
        ne.setRemind(addNote.getRemind());

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

        ne.setDate(saveNote.getDate());
        ne.setText(saveNote.getText());
        ne.setRemind(saveNote.getRemind());
        ne.setMuted(saveNote.getMuted());

        sessionFactory.getCurrentSession().update(ne);
    }

}
