package com.shang.controller;

import java.awt.Menu;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shang.domain.User;
import com.shang.service.UserService;

/**
 * 功能概要：UserController
 * 
 * @author shanghaitao
 * @since  2017年8月22日 
 */
@Controller
@RequestMapping("/login")
public class UserController {
	private static final long serialVersionUID = 1L;
	Logger logger = Logger.getLogger(UserController.class);	
	@Resource
	private UserService userService;
	
	@RequestMapping("/index")  
    public ModelAndView getIndex(){    
		System.out.println("1111");
		ModelAndView mav = new ModelAndView("index"); 
		User user = userService.selectUserById(1);
		System.out.println("2222");
	    mav.addObject("user", user); 
	    System.out.println(mav.toString());
        return mav;  
    }
	@RequestMapping("/login")
	public String index(Model model, HttpServletRequest request) {
		try {
			User user = null;
			user = (User) request.getSession(false).getAttribute("user");
			if (user != null) {
				List<Menu> mList = (List<Menu>) userService.selectUserById(user.getUserId());
				model.addAttribute("mList", mList);
				return "index";
			}
		} catch (Exception e) {
		}
		return "login/login";
	}
	@RequestMapping("/check")
	public String check(User user, HttpServletRequest request) {
		try {
			String username = user.getUserName();
			String password = user.getUserPassword();
			System.out.println(username+password);
			User user1 = userService.selectUserByUsername(username);
			if(user1.getUserPassword()!=null && password.equals(user1.getUserPassword())){
				logger.info("密码验证通过");
			}
			return "index";
			
//			System.out.println(request.getParameter("userName")+request.getParameter("userPassword"));
			
			
		} catch (Exception e) {
		}
		return "index";
	}
	
}
