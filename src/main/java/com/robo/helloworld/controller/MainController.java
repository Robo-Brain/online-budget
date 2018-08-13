package com.robo.helloworld.controller;

import com.robo.helloworld.form.EditTMPSpends;
import com.robo.helloworld.form.SaveNewMonth;
import com.robo.helloworld.form.SaveNewWage;
import com.robo.helloworld.repository.AdditionsDAO;
import com.robo.helloworld.repository.MonthlySpendsDAO;
import com.robo.helloworld.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@EnableWebMvc
@Controller
public class MainController {

    @Autowired
    private MonthlySpendsDAO monthlySpendsDAO;

    @Autowired
    private AdditionsDAO additionsDAO;

    @GetMapping("/")
    public String index(Model model) {
        return "loginPage";
    }


// MONTHLY SPENDS
    @GetMapping(value = "/editTMP")
    public String editTMP (Model model) {
        model.addAttribute("title", "Edit Payment Template");
        model.addAttribute("lastWage", monthlySpendsDAO.getLastWage());
        model.addAttribute("paymentTMP", monthlySpendsDAO.getPaymentTemplate());
        return "editTMP";
    }

    @PostMapping(value = "/saveTMP", produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public String saveTMP(@RequestBody List<EditTMPSpends> savePaymentTMP) {
        monthlySpendsDAO.savePaymentTemplate(savePaymentTMP);
        return "success";
    }

    @PostMapping(value = "/addNewSpend", produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public String addNewSpend(@RequestBody EditTMPSpends saveSpend) {
        monthlySpendsDAO.addNewSpendToTemplate(saveSpend);
        return "success";
    }

    @PostMapping(value = "/deleteSpend")
    @ResponseBody
    public String deleteSpend(@RequestBody Long id) {
        monthlySpendsDAO.deleteSpendFromTemplate(id);
        return "success";
    }

    @GetMapping("/createNewMonth")
    @ResponseBody
    public void saveNewMonth() throws Exception {
        monthlySpendsDAO.createNewMonth();
    }

    @GetMapping(value = "/currentMonth")
    public String get(Model model) throws Exception {
        model.addAttribute("title", "Current Month");
        model.addAttribute("currentMonth", monthlySpendsDAO.getMonthByDate(LocalDate.now(), "lastmonth")); //without string, method expects for already existing date in DB
        return "currentMonth";
    }

    @PostMapping(value = "/saveExistingMonth", produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public void saveNewMonth(@RequestBody List<SaveNewMonth> saveNewMonth) {
        monthlySpendsDAO.saveExistingMonth(saveNewMonth);
    }

//    SALARY AND PREPAID

    @GetMapping("/salary")
    public String getAllWages(Model model) {
        model.addAttribute("allWages", monthlySpendsDAO.getAllWages());
        return "salary";
    }

    @PostMapping(value = "/saveNewSalary", produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public void saveNewWage(@RequestBody SaveNewWage saveNewWage) {
        monthlySpendsDAO.saveNewWage(saveNewWage);
    }

    @PostMapping(value = "/editExistSalary", produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public void editExistSalary(@RequestBody SaveNewWage saveNewWage) {
        monthlySpendsDAO.editExistSalary(saveNewWage);
    }

    @PostMapping(value = "/delSalary")
    @ResponseBody
    public void delSalary(@RequestBody Long id) {
        monthlySpendsDAO.delSalary(id);
    }

    //  DEFAULT

    @GetMapping("/admin")
    public String adminPage(Model model, Principal principal) {

        User loginedUser = (User) ((Authentication) principal).getPrincipal();

        String userInfo = WebUtils.toString(loginedUser);
        model.addAttribute("userInfo", userInfo);

        return "adminPage";
    }

    @GetMapping("/login")
    public String loginPage(Model model) {

        return "loginPage";
    }

    @GetMapping("/logoutSuccessful")
    public String logoutSuccessfulPage(Model model) {
        model.addAttribute("title", "Logout");
        return "logoutSuccessfulPage";
    }

    @GetMapping("/403")
    public String accessDenied(Model model, Principal principal) {

        if (principal != null) {
            User loginedUser = (User) ((Authentication) principal).getPrincipal();

            String userInfo = WebUtils.toString(loginedUser);

            model.addAttribute("userInfo", userInfo);

            String message = "Hi " + principal.getName() //
                    + "<br> You do not have permission to access this page!";
            model.addAttribute("message", message);

        }

        return "403Page";
    }

}
