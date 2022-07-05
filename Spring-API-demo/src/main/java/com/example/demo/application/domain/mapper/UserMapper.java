package com.example.demo.application.domain.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.application.domain.model.User;
import com.example.demo.application.domain.model.UserPostRequestParam;
import com.example.demo.application.domain.model.UserPutRequestParam;

@Mapper
public interface UserMapper {
	List<User> findAll();
	void updateUser(UserPutRequestParam param);
	void insertUser(UserPostRequestParam param);
	void deleteUser(int id);
	User findByID(int id);
	
}
