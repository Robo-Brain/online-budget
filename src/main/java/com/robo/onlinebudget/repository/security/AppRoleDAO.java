package com.robo.onlinebudget.repository.security;

import com.robo.onlinebudget.entity.security.UserRole;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class AppRoleDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public List<String> getRoleNames(Long userId) {
        String hql = "SELECT ur.appRole.roleName FROM " + UserRole.class.getName() + " ur WHERE ur.appUser.userId = :userId ";
        Query query = this.sessionFactory.getCurrentSession().createQuery(hql, String.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }

}
