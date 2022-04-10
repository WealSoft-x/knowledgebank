package com.example.demo.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.application.domain.model.LoginRequestParam;
import com.example.demo.application.domain.model.UserPostRequestParam;
import com.example.demo.application.domain.model.UserPutRequestParam;
import com.example.demo.application.domain.model.UserResponseParam;
import com.example.demo.application.domain.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService service;
	
	@RequestMapping({ "/", "/index" })
    public String index() {
        return "Hello World";
    }
	
	@GetMapping("/users")
	public UserResponseParam GetUsers() {
		return service.get();
	}
	
	@PutMapping("/users")
	@ResponseStatus(HttpStatus.CREATED)
	public void PutUser(@RequestBody UserPutRequestParam param) {
		service.put(param);
	}
	
	@PostMapping("/users")
	@ResponseStatus(HttpStatus.CREATED)
	public void PostUser(@RequestBody UserPostRequestParam param) {
		service.post(param);
	}

	@DeleteMapping("/users")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void DeleteUsers(@RequestBody int id) {
		service.delete(id);
	}
	
	@PostMapping("/api/login")
	public String Login(@RequestBody LoginRequestParam param) {
		return "OK";
	}
}
