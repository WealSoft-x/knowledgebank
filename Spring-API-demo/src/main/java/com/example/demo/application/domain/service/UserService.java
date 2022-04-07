package com.example.demo.application.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.application.domain.mapper.UserMapper;
import com.example.demo.application.domain.model.UserPostRequestParam;
import com.example.demo.application.domain.model.UserPutRequestParam;
import com.example.demo.application.domain.model.UserResponseParam;

@Service
public class UserService {
	
	@Autowired
	private UserMapper userMapper;
	
	public UserResponseParam get() {
		UserResponseParam result = new UserResponseParam();
		result.setUser(userMapper.findAll());
		result.setRemarks("さんぷる");
		return result;
	}

	public void put(UserPutRequestParam param) {
		userMapper.updateUser(param);
	}

	public void post(UserPostRequestParam param) {
		userMapper.insertUser(param);
	}
	
	public void delete(int id) {
		userMapper.deleteUser(id);
	}
}
