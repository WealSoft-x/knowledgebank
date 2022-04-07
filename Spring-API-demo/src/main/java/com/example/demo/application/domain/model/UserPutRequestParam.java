package com.example.demo.application.domain.model;

import lombok.Data;

@Data
public class UserPutRequestParam {
	private int id_user;
	private String user_name;
	private String email;
}
