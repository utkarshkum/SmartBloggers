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

/**
 * Authenitcation filter that will be invoked before every request to an API
 * resource
 * 
 * @author maruthir
 *
 */
//@WebFilter("/rest/*")
// Apply to all API urls
public class AuthFilter implements Filter {

	public void destroy() {

	}

	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest hreq = (HttpServletRequest) req;
		HttpServletResponse hres = (HttpServletResponse) res;
		// dont check for authenitcation on requests for signup
		// REPLACE WITH YOUR OWN URLS
		if (hreq.getRequestURI().contains("/registration")) {
			//chain.doFilter(req, res);
			//return;
		}
		// Check if this request is already authenticated in a session
		if (hreq.getSession().getAttribute("user") != null) {
			// Authenitcated user, proceed with the api call
			//chain.doFilter(req, res);
			//return;
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
			String username = credentials.split(":")[0];
			String password = credentials.split(":")[1];
			// HARDCODED USERNAME CHECKING. REPLACE WITH DATABASE BASED
			// VERIFICATION LOGIC
			if (username.equals("admin") && password.equals("admin123")) {
				// User is autheticated.. setup session and proceed
				hres.setStatus(200, "Authorizated");
				//hreq.getSession().setAttribute("user", username);
				chain.doFilter(req, res);
				return;
			}
		} else {
			hres.sendError(401, "Invalid authenitcation details");
			return;
		}
	}

	public void init(FilterConfig arg0) throws ServletException {

	}

}

