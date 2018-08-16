package com.robo.onlinebudget.repository.security;

import com.robo.onlinebudget.entity.security.AppUser;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.NoResultException;
import javax.persistence.Query;

@Repository
@Transactional
public class AppUserDAO {

    @Autowired
    private SessionFactory sessionFactory;

    // @Query("SELECT e FROM app_user WHERE e.userName = ?1")
    public AppUser findUserAccount(String userName) {
        try {
            String hql = "SELECT e FROM " + AppUser.class.getName() + " e  WHERE e.userName = :userName ";
            Query query = sessionFactory.getCurrentSession().createQuery(hql, AppUser.class);
            query.setParameter("userName", userName);

            return (AppUser) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

}