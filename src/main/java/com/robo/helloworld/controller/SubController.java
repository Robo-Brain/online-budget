package com.robo.helloworld.controller;

import com.robo.helloworld.entity.NotesEntity;
import com.robo.helloworld.form.SaveNote;
import com.robo.helloworld.repository.AdditionsDAO;
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

    @ModelAttribute("notes")
    public List<NotesEntity> notes() {
        return additionsDAO.getNotes();
    }

    @GetMapping("/notes")
    public String getAllNotes(Model model) {
        model.addAttribute("notes", additionsDAO.getNotes());
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
    public String addNote(@RequestBody SaveNote addNote) {
        additionsDAO.addNote(addNote);
        return "success";
    }

    @PostMapping("/delNote")
    @ResponseBody
    public String delNote(@RequestBody Long id) {
        additionsDAO.delNote(id);
        return "success";
    }

    @PostMapping("/saveExistSalary")
    @ResponseBody
    public String saveNote(@RequestBody SaveNote saveNote) {
        additionsDAO.saveNote(saveNote);
        return "success";
    }

}
