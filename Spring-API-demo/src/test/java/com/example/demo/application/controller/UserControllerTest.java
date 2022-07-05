package com.example.demo.application.controller;

import static org.junit.jupiter.api.Assertions.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.application.domain.mapper.UserMapper;
import com.example.demo.application.domain.model.User;
import com.example.demo.application.domain.model.UserPostRequestParam;
import com.example.demo.application.domain.model.UserPutRequestParam;
import com.example.demo.application.domain.model.UserResponseParam;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UserControllerTest {

	@Autowired
    private UserController userController;

	@Autowired
    private UserMapper mapper;
	
	@BeforeAll
	void setup() throws ClassNotFoundException, SQLException {
        String url = "jdbc:mysql://localhost/DEMO";
		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection(url, "root", "root");
		Statement state = con.createStatement();
		
		state.executeUpdate("DROP TABLE DEMO.M_USERS");
		state.executeUpdate("CREATE TABLE DEMO.M_USERS (ID_USER SERIAL PRIMARY KEY,USER_NAME TEXT,EMAIL TEXT NOT NULL)");
		state.executeUpdate("INSERT INTO DEMO.M_USERS(USER_NAME, EMAIL) VALUES('田中', 'sample@gmail.com')");
		state.executeUpdate("INSERT INTO DEMO.M_USERS(USER_NAME, EMAIL) VALUES('山田', 'sample@gmail.com')");
		state.executeUpdate("INSERT INTO DEMO.M_USERS(USER_NAME, EMAIL) VALUES('鈴木', 'sample@gmail.com')");

	}

	@Test
	@Order(1)
	void GetUsersのメソッドテスト() throws Exception {		
		UserResponseParam userResponseParam = new UserResponseParam();
		List<User> userList = new ArrayList();
		User user1 = new User();
		user1.setId_user(1);
		user1.setUser_name("田中");
		user1.setEmail("sample@gmail.com");
		
		User user2 = new User();
		user2.setId_user(2);
		user2.setUser_name("山田");
		user2.setEmail("sample@gmail.com");

		User user3 = new User();
		user3.setId_user(3);
		user3.setUser_name("鈴木");
		user3.setEmail("sample@gmail.com");

		userList.add(user1);
		userList.add(user2);
		userList.add(user3);
		
		userResponseParam.setRemarks("さんぷる");
		userResponseParam.setUser(userList);

		assertEquals(userResponseParam, userController.GetUsers());

	}

	@Test
	@Order(2)
	void DeleteUserのメソッドテスト() throws Exception {
		userController.DeleteUsers(1);
		User user = mapper.findByID(1);
		assertNull(user);
	}

	@Test
	@Order(3)
	void PutUserのメソッドテスト() throws Exception {
		UserPutRequestParam userPutRequestParam = new UserPutRequestParam();
		userPutRequestParam.setId_user(3);
		userPutRequestParam.setUser_name("前田");
		userPutRequestParam.setEmail("sample@gamil.com");
		userController.PutUser(userPutRequestParam);

		User findUser = mapper.findByID(3);
		
		User assertUser = new User();
		assertUser.setEmail("sample@gamil.com");
		assertUser.setId_user(3);
		assertUser.setUser_name("前田");
		
		assertEquals(findUser, assertUser);
	}
	
	@Test
	@Order(4)
	void PostUserのメソッドテスト() throws Exception {
		UserPostRequestParam userPostRequestParam = new UserPostRequestParam();
		userPostRequestParam.setUser_name("林");
		userPostRequestParam.setEmail("sample@gamil.com");
		userController.PostUser(userPostRequestParam);

		User findUser = mapper.findByID(4);
		User assertUser = new User();
		assertUser.setEmail("sample@gamil.com");
		assertUser.setId_user(4);
		assertUser.setUser_name("林");
		
		assertEquals(findUser, assertUser);
	}
	
}
