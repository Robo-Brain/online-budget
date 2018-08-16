package com.robo.onlinebudget.repository;


import com.robo.onlinebudget.entity.SpendsEntity;
import com.robo.onlinebudget.entity.SpendsMonthlyEntity;
import com.robo.onlinebudget.entity.WagesEntity;
import com.robo.onlinebudget.form.SaveSpends;
import com.robo.onlinebudget.form.SaveNewMonth;
import com.robo.onlinebudget.form.SaveNewWage;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Repository
@Transactional
public class MonthlySpendsDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public MonthlySpendsDAO() {
    }

//  METHODS OF MONTHLY WAGES
    public List getPaymentTemplate() {

        String hql = "FROM " + SpendsEntity.class.getName();
        List<SpendsEntity> list = sessionFactory.getCurrentSession().createQuery(hql).list();
        List<Map> map = new ArrayList<>();

        for(int i=0; i<list.size(); i++) {
            SpendsEntity se = list.get(i);
            Map<String, String> submap = new LinkedHashMap<>();

            submap.put("id", String.valueOf(se.getId()));
            submap.put("name", se.getName());
            submap.put("amount", String.valueOf(se.getAmount()));
            submap.put("salaryPrepaid", String.valueOf(se.getSalaryPrepaid()));
            submap.put("withdraw", String.valueOf(se.getWithdraw()));

            map.add(i, submap);
        }

        return map;
    }

    @SuppressWarnings("unchecked")
    public void savePaymentTemplate(List<SaveSpends> savePaymentTMP) {
        for (SaveSpends es : savePaymentTMP) {
            SpendsEntity se = new SpendsEntity(es.getId(), es.getName(), es.getAmount(), es.getSalaryPrepaid(), es.getWithdraw());
            sessionFactory.getCurrentSession().update(se);
        }
    }

    public void addNewSpendToTemplate(SaveSpends editTMPSpends) {
        SpendsEntity se = new SpendsEntity(editTMPSpends.getId(), editTMPSpends.getName(), editTMPSpends.getAmount(), editTMPSpends.getSalaryPrepaid(), editTMPSpends.getWithdraw());
        sessionFactory.getCurrentSession().save(se);

        SpendsMonthlyEntity sme = new SpendsMonthlyEntity();
        List<SpendsMonthlyEntity> smeList = getLastMonth();
        sme.setDate(smeList.get(0).getDate());
        sme.setSpendId(se.getId());
        sme.setAmount(0);
        sessionFactory.getCurrentSession().persist(sme);
    }

    public void deleteSpendFromTemplate(Long id) {

        String hql = "DELETE " + SpendsEntity.class.getName() + " WHERE id = :id";
        Query q = sessionFactory.getCurrentSession().createQuery(hql).setParameter("id", id);

        List<SpendsMonthlyEntity> smeList = getLastMonth();
        String hq2 = "DELETE " + SpendsMonthlyEntity.class.getName() + " WHERE spendId = :spendId";
        Query q2 = sessionFactory.getCurrentSession().createQuery(hq2).setParameter("spendId", id);

        q.executeUpdate();
        q2.executeUpdate();

    }

    @SuppressWarnings("unchecked")
    public void createNewMonth() throws Exception { // ADD NEW PAYMENT MONTH

        String hql = "SELECT new " + SpendsMonthlyEntity.class.getName() + "(e.date) FROM " + SpendsMonthlyEntity.class.getName() + " e " + "ORDER BY e.id DESC";
        SpendsMonthlyEntity smeDate = sessionFactory.getCurrentSession().createQuery(hql, SpendsMonthlyEntity.class).setMaxResults(1).uniqueResult();

        LocalDate ldIncoming = LocalDate.now();
        LocalDate ldDB = LocalDate.parse(smeDate.getDate());

        boolean sameDay = ldIncoming.getYear() == ldDB.getYear() &&  ldIncoming.getMonth() == ldDB.getMonth(); // check if the current month exists or not

        if (sameDay){
            throw new Exception("Date already exists!");
        } else{
            List<SpendsEntity> sne = sessionFactory.getCurrentSession().createQuery("SELECT new " + SpendsEntity.class.getName() +
                    "(e.id, e.name) FROM " + SpendsEntity.class.getName() + " e ").getResultList();
            List<LocalDate> list = new ArrayList<>(Collections.nCopies(sne.size(), ldIncoming)); // create list and fill it with number of rows with date(LocalDate.now()) = SpendsEntity number of rows

        for(int i=0; i<list.size(); i++) {
                SpendsMonthlyEntity sme = new SpendsMonthlyEntity();
                sme.setDate(String.valueOf(list.get(i)));
                sme.setSpendId(sne.get(i).getId());
                sme.setAmount(0);
                sessionFactory.getCurrentSession().persist(sme);
            }
        }

    }

    public List getLastMonth() {

        Query query = sessionFactory.getCurrentSession().createQuery("FROM " + SpendsMonthlyEntity.class.getName() +
                "  WHERE month(date) = :month and year(date) = :year");

        int month = LocalDate.now().getMonth().getValue();
        int year = LocalDate.now().getYear();

        query.setParameter("month", month);
        query.setParameter("year", year);

        List<SpendsMonthlyEntity> spendsMonthlyList = query.list();

        while (spendsMonthlyList.isEmpty() && month > 1) {
            month--;
            query.setParameter("month", month);
            spendsMonthlyList = query.list();
        }

        return spendsMonthlyList;

    }

    @SuppressWarnings("unchecked")
    public List getMonthByDate(LocalDate d, String... nowadays) throws Exception {

        Query query = sessionFactory.getCurrentSession().createQuery("FROM " + SpendsEntity.class.getName() +
                " AS se INNER JOIN se.spendsMonthly" +
                "  WHERE month(date) = :month and year(date) = :year");

        if (nowadays.length > 0 ){
            int month = LocalDate.now().getMonth().getValue();
            int year = LocalDate.now().getYear();

            query.setParameter("month", month);
            query.setParameter("year", year);

            List<Object[]> spendsMonthlyList = query.list();

            while (spendsMonthlyList.isEmpty() && month > 1) {
                month--;
                query.setParameter("month", month);
                spendsMonthlyList = query.list();
            }
            return getMonthMap(spendsMonthlyList);

        } else {
            int month = d.getMonth().getValue();
            int year = d.getYear();

            query.setParameter("month", month);
            query.setParameter("year", year);

            List<Object[]> spendsMonthlyList = query.list();

            if (spendsMonthlyList.isEmpty()) {
                throw new Exception("No such month!");
            } else {
                return getMonthMap(spendsMonthlyList);
            }
        }
    }

    public List getMonthMap(List<Object[]> list) {

        SpendsEntity se;
        SpendsMonthlyEntity sme;

        List<Map> result = new ArrayList<>();

        for(int i=0; i<list.size(); i++) {
            Object[] row = list.get(i);
            se = (SpendsEntity)row[0];
            sme = (SpendsMonthlyEntity)row[1];

            Map<String, String> submap = new LinkedHashMap<>();
            submap.put("name", se.getName());
            submap.put("amount", se.getAmount().toString());
            submap.put("salaryPrepaid", String.valueOf(se.getSalaryPrepaid()));
            submap.put("withdraw", String.valueOf(se.getWithdraw()));
            submap.put("id", String.valueOf(sme.getId()));
            submap.put("date", String.valueOf(sme.getDate()));
            submap.put("spendId", String.valueOf(sme.getSpendId()));
            submap.put("monthAmount", String.valueOf(sme.getAmount()));

            result.add(i, submap);
        }
        return result;
    }

    public void saveExistingMonth(List<SaveNewMonth> saveNewMonthMap) {
        for (SaveNewMonth snm : saveNewMonthMap){
            String hql = "FROM " + SpendsMonthlyEntity.class.getName() + " AS sme WHERE id = " + snm.getId() + "";
            SpendsMonthlyEntity sme = sessionFactory.getCurrentSession().createQuery(hql, SpendsMonthlyEntity.class).getSingleResult();

            if (snm.getAmount() == null){
                snm.setAmount(0);
            }

            sme.setAmount(snm.getAmount());
            sessionFactory.getCurrentSession().update(sme);
        }

    }

////  SALARY AND PREPAID METHODS

    public List<WagesEntity> getAllWages() {
        String hql = "SELECT new " + WagesEntity.class.getName() + "(e.id, e.salaryDate, e.salary, e.prepaidDate, e.prepaid) FROM "
                + WagesEntity.class.getName() + " e " + "ORDER BY e.id DESC";

         return sessionFactory.getCurrentSession().createQuery(hql, WagesEntity.class).getResultList();

    }

    public WagesEntity getLastWage() {
        String hql = "SELECT new " + WagesEntity.class.getName() + "(e.id, e.salaryDate, e.salary, e.prepaidDate, e.prepaid) FROM "
        + WagesEntity.class.getName() + " e " + "ORDER BY e.id DESC";

        Query<WagesEntity> query = sessionFactory.getCurrentSession().createQuery(hql, WagesEntity.class);
        query.setMaxResults(1).uniqueResult();

        return query.getSingleResult();
    }

    public void saveNewWage(SaveNewWage saveNewWage) {
        WagesEntity we = new WagesEntity();

        we.setSalaryDate(saveNewWage.getSalaryDate());
        we.setSalary(saveNewWage.getSalary());
        we.setPrepaidDate(saveNewWage.getPrepaidDate());
        we.setPrepaid(saveNewWage.getPrepaid());

        sessionFactory.getCurrentSession().saveOrUpdate(we);

    }

    public void editExistSalary(SaveNewWage saveNewWage) {

        String hql = "FROM " + WagesEntity.class.getName() + " AS we WHERE id = " + saveNewWage.getId() + "";

        WagesEntity we = sessionFactory.getCurrentSession().createQuery(hql, WagesEntity.class).getSingleResult();

        we.setSalaryDate(saveNewWage.getSalaryDate());
        we.setSalary(saveNewWage.getSalary());
        we.setPrepaidDate(saveNewWage.getPrepaidDate());
        we.setPrepaid(saveNewWage.getPrepaid());

        sessionFactory.getCurrentSession().update(we);

    }

    public void delSalary(Long id) {
        String hql = "DELETE " + WagesEntity.class.getName() + " WHERE id = :id";
        Query q = sessionFactory.getCurrentSession().createQuery(hql).setParameter("id", id);
        q.executeUpdate();
    }

    // ADMIN FEATURES

    public void delLastMonth() {

        List<SpendsMonthlyEntity> list = getLastMonth();
        SpendsMonthlyEntity sme = list.get(0);

        String hql = "DELETE " + SpendsMonthlyEntity.class.getName() + " WHERE date = :date";
        Query q = sessionFactory.getCurrentSession().createQuery(hql).setParameter("date", sme.getDate());
        q.executeUpdate();

    }

}
