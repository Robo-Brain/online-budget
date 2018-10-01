package com.robo.onlinebudget.repository;


import com.robo.onlinebudget.entity.SpendsEntity;
import com.robo.onlinebudget.entity.SpendsMonthlyEntity;
import com.robo.onlinebudget.entity.WagesEntity;
import com.robo.onlinebudget.form.SaveNewMonth;
import com.robo.onlinebudget.form.SaveNewWage;
import com.robo.onlinebudget.form.SaveSpends;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Repository
@Transactional
public class MonthlySpendsDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public MonthlySpendsDAO() {
    }

    //  METHODS OF MONTHLY WAGES
    public List getPaymentTemplate(boolean isInactive) {

        String hql = "FROM " + SpendsEntity.class.getName() + " WHERE inactive = " + isInactive;
        List<SpendsEntity> list = sessionFactory
                .getCurrentSession()
                .createQuery(hql)
                .list();
        List<Map> map = new ArrayList<>();

        for (int i = 0; i < list.size(); i++) {
            SpendsEntity se = list.get(i);
            Map<String, String> submap = new LinkedHashMap<>();

            submap.put("id", String.valueOf(se.getId()));
            submap.put("name", se.getName());
            submap.put("amount", String.valueOf(se.getAmount()));
            submap.put("salaryPrepaid", String.valueOf(se.getSalaryPrepaid()));
            submap.put("withdraw", String.valueOf(se.getWithdraw()));
            submap.put("index", String.valueOf(se.getIndex()));
            submap.put("inactive", String.valueOf(se.getInactive()));

            map.add(i, submap);
        }

        return map;
    }

    @SuppressWarnings("unchecked")
    public void savePaymentTemplate(List<SaveSpends> savePaymentTMP) {
        for (SaveSpends es : savePaymentTMP) {
            SpendsEntity se = new SpendsEntity(es.getId(), es.getName(), es.getAmount(), es.getSalaryPrepaid(), es.getWithdraw(), es.getIndex());
            sessionFactory.getCurrentSession().update(se);
        }
    }

    public void addNewSpendToTemplate(SaveSpends editTMPSpends) throws Exception {

        if (editTMPSpends.getName() == null || editTMPSpends.getName().isEmpty()) {
            throw new Exception("Name of spend must not be empty");
        }

        if (editTMPSpends.getAmount() == null) {
            throw new Exception("Amount of spend must not be empty");
        }

        String hql = "SELECT new " + SpendsEntity.class.getName() + "(e.index) FROM " + SpendsEntity.class.getName() + " e " + "ORDER BY e.index DESC";
        SpendsEntity indexMaxNum = sessionFactory.getCurrentSession().createQuery(hql, SpendsEntity.class).setMaxResults(1).uniqueResult();

        SpendsEntity se = new SpendsEntity(editTMPSpends.getId(), editTMPSpends.getName(), editTMPSpends.getAmount(), editTMPSpends.getSalaryPrepaid(), editTMPSpends.getWithdraw(), indexMaxNum.getIndex() + 1);
        sessionFactory.getCurrentSession().save(se);

        SpendsMonthlyEntity sme = new SpendsMonthlyEntity();
//        List<SpendsMonthlyEntity> smeList = getLastMonth();
        List<SpendsMonthlyEntity> smeList = getNLastMonth(1);
        sme.setDate(smeList.get(0).getDate());
        sme.setSpendId(se.getId());
        sme.setAmount(0);
        sessionFactory.getCurrentSession().persist(sme);
    }

    public void deleteSpendFromTemplate(Long id) {
        String hql = "FROM " + SpendsEntity.class.getName() + " WHERE id = :id";
        SpendsEntity seResult = (SpendsEntity) sessionFactory.getCurrentSession().createQuery(hql).setParameter("id", id).getSingleResult();

        seResult.setInactive(true);

        sessionFactory.getCurrentSession().update(seResult);

//        List<SpendsMonthlyEntity> smeList = getLastMonth();
        List<SpendsMonthlyEntity> smeList = getNLastMonth(1);
        String smeDate = smeList.get(0).getDate();
        String hq2 = "DELETE " + SpendsMonthlyEntity.class.getName() + " WHERE spendId = :spendId AND date = :date";
        Query q2 = sessionFactory.getCurrentSession().createQuery(hq2).setParameter("spendId", id).setParameter("date", smeDate);

        q2.executeUpdate();

    }

    public void restoreSpend(Long id) {
        String hql = "FROM " + SpendsEntity.class.getName() + " WHERE id = :id";
        Query q = sessionFactory.getCurrentSession().createQuery(hql).setParameter("id", id);

        SpendsEntity se = (SpendsEntity) q.getSingleResult();
        se.setInactive(false);
        sessionFactory.getCurrentSession().update(se);

        SpendsMonthlyEntity sme = new SpendsMonthlyEntity();
//        List<SpendsMonthlyEntity> smeList = getLastMonth();
        List<SpendsMonthlyEntity> smeList = getNLastMonth(1);
        sme.setDate(smeList.get(0).getDate());
        sme.setSpendId(se.getId());
        sme.setAmount(0);
        sessionFactory.getCurrentSession().persist(sme);
    }

    public List getSpendsNames(int n) {
        List<List> smeList = getNLastMonth(n);
        List<Map> result = new ArrayList<>();

        for (int i = 0; i < smeList.size(); i++) {

            Map<String, Map> resultMap = new LinkedHashMap<>();
            Map<String, String> submap = new LinkedHashMap<>();
            String date = null;

            for (int x = 0; x < smeList.get(i).size(); x++){

                Map tmpMap = (Map) smeList.get(i).get(x);
                date = (String) tmpMap.get("date");

                submap.put((String) tmpMap.get("id"), (String) tmpMap.get("name"));
            }
            submap.put("date", date);
            result.add(submap);
        }
        return result;
//        List<List> smeList = getNLastMonth(n);
//        List<Map> result = new ArrayList<>();
//
//        for (int i = 0; i < smeList.size(); i++) {
//            Map<String, Map> resultMap = new LinkedHashMap<>();
//            Map<String, String> submap = new LinkedHashMap<>();
//            String date = null;
//            for (int x = 0; x < smeList.get(i).size(); x++){
//                Map tmpMap = (Map) smeList.get(i).get(x);
//                submap.put((String) tmpMap.get("id"), (String) tmpMap.get("name"));
//                date = (String) tmpMap.get("date");
//            }
//            resultMap.put(date, submap);
//            result.add(resultMap);
//        }
//        return result;

    }

    public String checkBeforeCreateNewMonth() {
        String hql = "SELECT new " + SpendsMonthlyEntity.class.getName() + "(e.date) FROM " + SpendsMonthlyEntity.class.getName() + " e " + "ORDER BY e.id DESC";
        SpendsMonthlyEntity smeDate = sessionFactory.getCurrentSession().createQuery(hql, SpendsMonthlyEntity.class).setMaxResults(1).uniqueResult();

        LocalDate ldIncoming = LocalDate.now();
        LocalDate ldDB = LocalDate.parse(smeDate.getDate());

        String hql2 = "SELECT new " + SpendsEntity.class.getName() + "(s.id, s.amount) FROM " + SpendsEntity.class.getName() + " s WHERE s.inactive = 0";
        List<SpendsEntity> spendsList = sessionFactory.getCurrentSession().createQuery(hql2, SpendsEntity.class).getResultList();
        Map<Long, Integer> spendsMap = new HashMap<>();
        for (int i = 0; i < spendsList.size(); i++) {
            SpendsEntity se = spendsList.get(i);
            spendsMap.put(se.getId(), se.getAmount());
        }

        List<SpendsMonthlyEntity> spendsMonthlyList = getNLastMonth(1);
        Map<Long, Integer> spendsMonthlyMap = new HashMap<>();
        for (int i = 0; i < spendsMonthlyList.size(); i++) {
            SpendsMonthlyEntity sme = spendsMonthlyList.get(i);
            spendsMonthlyMap.put(sme.getSpendId(), sme.getAmount());
        }

        boolean sameDay = ldIncoming.getYear() == ldDB.getYear() && ldIncoming.getMonth() == ldDB.getMonth(); // check for the current date already exist
        boolean done = spendsMap.equals(spendsMonthlyMap);


        if (sameDay) {
            return "The current month is not over yet!";
        } else if (!done) {
            return "The current month not all payments are paid off!";
        } else {
            createNewMonth();
            return null;
        }

    }

    @SuppressWarnings("unchecked")
    public void createNewMonth() { // ADD NEW PAYMENT MONTH
        LocalDate ldIncoming = LocalDate.now();

        List<SpendsEntity> sne = sessionFactory.getCurrentSession().createQuery("FROM "
                + SpendsEntity.class.getName()
                + " WHERE inactive = 0")
                .getResultList();
        List<LocalDate> list = new ArrayList<>(Collections.nCopies(sne.size(), ldIncoming)); // create list and fill it with number of rows with date(LocalDate.now()) = SpendsEntity number of rows

        for (int i = 0; i < list.size(); i++) {
            SpendsMonthlyEntity sme = new SpendsMonthlyEntity();
            sme.setDate(String.valueOf(list.get(i)));
            sme.setSpendId(sne.get(i).getId());
            sme.setAmount(0);
            sessionFactory.getCurrentSession().persist(sme);
        }
    }

    public List getAllMonths() {

        String hql = "SELECT new "
                + SpendsMonthlyEntity.class.getName()
                + " (s.date) FROM "
                + SpendsMonthlyEntity.class.getName()
                + " AS s";

        List<SpendsMonthlyEntity> smeList = sessionFactory.getCurrentSession().createQuery(hql, SpendsMonthlyEntity.class).getResultList();

        List<String> datesList = new ArrayList<>();

        for (SpendsMonthlyEntity smeUnit : smeList) {
            datesList.add(smeUnit.getDate());
        }

        List<String> uniqueDatesList = datesList.stream()
                .distinct()
                .collect(Collectors.toList());

        List<List> result = new ArrayList<>();

        for (String uniqueDate : uniqueDatesList) {
            LocalDate date = LocalDate.parse(uniqueDate);
            try {
                result.add(getMonthByDate(date));
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        Collections.reverse(result);

        return result;

    }

@SuppressWarnings("unchecked")
    public List getNLastMonth(int n) {
        List<Map> spendsMonthlyList;
        List result = new ArrayList<>();
        LocalDate now = LocalDate.now();
        Integer tryCounts = 0;

            for (int i = 0; i < n; i++) {
                spendsMonthlyList = getMonthByDate(now);

                while (spendsMonthlyList.isEmpty() && tryCounts < 12) {
                    if (now.getMonthValue() > 1) {
                        now = now.minusMonths(1);
                        spendsMonthlyList = getMonthByDate(now);
                    } else {
                        Calendar cal = Calendar.getInstance();
                        now = LocalDate.of(cal.get(Calendar.YEAR)-1,12, 1);
                        spendsMonthlyList = getMonthByDate(now);
                    }
                    tryCounts++;
                }
                now = now.minusMonths(1);
                if (n == 1) return spendsMonthlyList;
                else result.add(spendsMonthlyList);
            }
            return result;
    }

    @SuppressWarnings("unchecked")
    public List<Map> getMonthByDate(LocalDate d) {

        SpendsEntity se;
        SpendsMonthlyEntity sme;

        List<Map> result = new ArrayList<>();

        Query query = sessionFactory
                .getCurrentSession()
                .createQuery("FROM "
                        + SpendsEntity.class.getName()
                        + " AS se INNER JOIN se.spendsMonthly"
                        + " WHERE month(date) = :month"
                        + " and"
                        + " year(date) = :year"
                        + " and se.inactive = 0");
        int month = d.getMonth().getValue();
        int year = d.getYear();

        query.setParameter("month", month);
        query.setParameter("year", year);

        List<Object[]> spendsMonthlyList = query.list();

        for (int i = 0; i < spendsMonthlyList.size(); i++) {
            Object[] row = spendsMonthlyList.get(i);
            se = (SpendsEntity) row[0];
            sme = (SpendsMonthlyEntity) row[1];

            Map<String, String> submap = new LinkedHashMap<>();
            submap.put("name", se.getName());
            submap.put("amount", se.getAmount().toString());
            submap.put("salaryPrepaid", String.valueOf(se.getSalaryPrepaid()));
            submap.put("withdraw", String.valueOf(se.getWithdraw()));
            submap.put("index", String.valueOf(se.getIndex()));
            submap.put("inactive", String.valueOf(se.getInactive()));
            submap.put("id", String.valueOf(sme.getId()));
            submap.put("date", String.valueOf(sme.getDate()));
            submap.put("spendId", String.valueOf(sme.getSpendId()));
            submap.put("monthAmount", String.valueOf(sme.getAmount()));

            result.add(i, submap);
        }

        return result;

    }

    public void saveExistingMonth(List<SaveNewMonth> saveNewMonthMap) {
        for (SaveNewMonth snm : saveNewMonthMap) {
            String hql = "FROM " + SpendsMonthlyEntity.class.getName() + " AS sme WHERE id = " + snm.getId() + "";
            SpendsMonthlyEntity sme = sessionFactory.getCurrentSession().createQuery(hql, SpendsMonthlyEntity.class).getSingleResult();

            if (snm.getAmount() == null) {
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

//        List<SpendsMonthlyEntity> list = getLastMonth();
        List<SpendsMonthlyEntity> list = getNLastMonth(1);
        SpendsMonthlyEntity sme = list.get(0);

        String hql = "DELETE " + SpendsMonthlyEntity.class.getName() + " WHERE date = :date";
        Query q = sessionFactory.getCurrentSession().createQuery(hql).setParameter("date", sme.getDate());
        q.executeUpdate();

    }

}
