package com.cisco.util;

import java.io.IOException;
import java.nio.charset.Charset;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;

import com.cisco.dao.UserDAO;
import com.cisco.model.User;

/**
 * Authenitcation filter that will be invoked before every request to an API
 * resource
 * 
 * @author utkarsh
 *
 */
@WebFilter("/rest/*")
// Apply to all API urls
public class AuthFilter implements Filter {
	
	private UserDAO userDAO = UserDAO.getInstance();


	public void destroy() {

	}

	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest hreq = (HttpServletRequest) req;
		HttpServletResponse hres = (HttpServletResponse) res;

		// When a new user is registering then we don't need to validate it. 
		if (hreq.getRequestURI().contains("/users") && hreq.getMethod().equals("POST")) {
			chain.doFilter(req, res);
			return;
		}

		// Not an already authenticated user, check for credentials
		// Get basic auth header
		String basicAuthHeader = hreq.getHeader("Authorization");
		if (basicAuthHeader == null) {
			hres.sendError(401, "Unauthenticated");
			return;
		}
		// decode it to a form of Basic username:password
		if (basicAuthHeader != null && basicAuthHeader.startsWith("Basic")) {
			// Authorization: Basic base64credentials
			String base64Credentials = basicAuthHeader.substring(
					"Basic".length()).trim();
			
			String credentials = new String(Base64.decodeBase64(base64Credentials));
			// credentials = username:password
			// Split the user name and password
			String userName = credentials.split(":")[0];
			String password = credentials.split(":")[1];
			// HARDCODED USERNAME CHECKING. REPLACE WITH DATABASE BASED
			// VERIFICATION LOGIC
			User user = new User();
			user.setName(userName);
			user.setPassword(password);
			
			if (userDAO.validateUser(user)) {
				chain.doFilter(req, res);
				return;
			}
		} 
		
		hres.sendError(401, "Invalid authenitcation details");
		return;
		
	}

	public void init(FilterConfig arg0) throws ServletException {

	}

}

