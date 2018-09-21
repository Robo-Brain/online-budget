package com.robo.onlinebudget.controller;

import com.robo.onlinebudget.entity.NotesEntity;
import com.robo.onlinebudget.form.SaveAnalysis;
import com.robo.onlinebudget.form.SaveNote;
import com.robo.onlinebudget.repository.AdditionsDAO;
import com.robo.onlinebudget.repository.MonthlySpendsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;

@EnableWebMvc
@Controller
@ControllerAdvice
public class SubController {

    @Autowired
    private AdditionsDAO additionsDAO;
    @Autowired
    private MonthlySpendsDAO monthlySpendsDAO;

    @ModelAttribute("notes")
    public List<NotesEntity> notes() {
        return additionsDAO.getNotes();
    }

    @GetMapping("/notes")
    public String getAllNotes(Model model) {
        model.addAttribute("notes", additionsDAO.getNotes());
//        model.addAttribute("months", monthlySpendsDAO.getNLastMonth(3));
        model.addAttribute("months", monthlySpendsDAO.getSpendsNames(3));
        return "notes";
    }

    @PostMapping("/muteNote")
    @ResponseBody
    public String muteNote(@RequestBody Long id) {
        additionsDAO.muteNote(id);
        return "success";
    }

    @PostMapping("/addNote")
    @ResponseBody
    public String addNote(@RequestBody SaveNote addNote) throws Exception {
        additionsDAO.addNote(addNote);
        return "success";
    }

    @PostMapping("/delNote")
    @ResponseBody
    public String delNote(@RequestBody Long id) {
        additionsDAO.delNote(id);
        return "success";
    }

    @PostMapping("/saveExistNote")
    @ResponseBody
    public String saveNote(@RequestBody SaveNote saveNote) {
        additionsDAO.saveNote(saveNote);
        return "success";
    }

    //MEDICINE

    @GetMapping("/analysisList")
    public String analysisList(Model model) {
        model.addAttribute("analysisList", additionsDAO.getAnalysisList());
        return "analysisList";
    }

    @PostMapping("/delAnalysisFromList")
    @ResponseBody
    public String delAnalysisFromList(@RequestBody Long id) {
        additionsDAO.delAnalysisFromList(id);
        return "success";
    }

    @PostMapping("/saveExistAnalysisToList")
    @ResponseBody
    public String saveExistAnalysisToList(@RequestBody SaveAnalysis saveAnalysis) throws Exception {
        additionsDAO.saveAnalysis(saveAnalysis);
        return "success";
    }

    @PostMapping("/addAnalysis")
    @ResponseBody
    public String addAnalysis(@RequestBody SaveAnalysis saveAnalysis) throws Exception {
        additionsDAO.addAnalysis(saveAnalysis);
        return "success";
    }

}
