package com.robo.helloworld.controller;

import com.robo.helloworld.entity.NotesEntity;
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

}