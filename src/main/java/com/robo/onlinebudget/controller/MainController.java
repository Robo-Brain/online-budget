package com.robo.onlinebudget.controller;

import com.robo.onlinebudget.form.SaveNewMonth;
import com.robo.onlinebudget.form.SaveNewWage;
import com.robo.onlinebudget.form.SaveSpends;
import com.robo.onlinebudget.repository.AdditionsDAO;
import com.robo.onlinebudget.repository.MonthlySpendsDAO;
import com.robo.onlinebudget.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.security.Principal;
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated()) {
            model.addAttribute("title", "All Months");
            return allMonths(model);
        } else
            return "loginPage";
    }

    @GetMapping(value = "/allMonths")
    public String allMonths (Model model) {
        model.addAttribute("title", "All Months");
        model.addAttribute("allMonths", monthlySpendsDAO.getAllMonths());
        model.addAttribute("months", monthlySpendsDAO.getNLastMonth(3));
        model.addAttribute("notes", additionsDAO.getNotes());
        return "allMonths";
    }


// MONTHLY SPENDS
    @GetMapping(value = "/editTemplate")
    public String editTemplate (Model model) {
        model.addAttribute("title", "Edit Payment Template");
        model.addAttribute("lastWage", monthlySpendsDAO.getLastWage());
        model.addAttribute("payments", monthlySpendsDAO.getPaymentTemplate(false));
        return "editTemplate";
    }

    @PostMapping(value = "/saveTMP", produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public String saveTMP(@RequestBody List<SaveSpends> savePaymentTMP) {
        monthlySpendsDAO.savePaymentTemplate(savePaymentTMP);
        return "success";
    }

    @PostMapping(value = "/addNewSpend", produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public String addNewSpend(@RequestBody SaveSpends saveSpend) throws Exception {
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
    public void saveNewMonthWithCheck() {
        String result = monthlySpendsDAO.checkBeforeCreateNewMonth();
        if (result != null) throw new SecurityException(result);
    }
    @GetMapping("/createNewMonthUncheck")
    @ResponseBody
    public void saveNewMonthWithOUTCheck() {
        monthlySpendsDAO.createNewMonth();
    }

    @GetMapping(value = "/currentMonth")
    public String get(Model model) {
        model.addAttribute("title", "Current Month");
        model.addAttribute("currentMonth", monthlySpendsDAO.getNLastMonth(1)); // 1 = it's a last month
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
        model.addAttribute("title", "Salary");
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

    @PostMapping(value = "/restoreSpend")
    @ResponseBody
    public String restoreSpend(@RequestBody Long id) {
        monthlySpendsDAO.restoreSpend(id);
        return "success";
    }

    @GetMapping("/delLastMonth")
    @ResponseBody
    public String delLastMonth() {
        monthlySpendsDAO.delLastMonth();
        return "success";
    }

    //  DEFAULT

    @GetMapping("/admin")
    public String adminPage(Model model, Principal principal) {
        User loginedUser = (User) ((Authentication) principal).getPrincipal();
        String userInfo = WebUtils.toString(loginedUser);
        model.addAttribute("userInfo", userInfo);
        model.addAttribute("lastMonth", monthlySpendsDAO.getNLastMonth(1));
        model.addAttribute("disabledPayments", monthlySpendsDAO.getPaymentTemplate(true));
        return "adminPage";
    }

    @GetMapping("/login")
    public String loginPage(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated()) {
            model.addAttribute("title", "All Months");
            return allMonths(model);
        } else {
            model.addAttribute("title", "Login page");
            return "loginPage";
        }
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
