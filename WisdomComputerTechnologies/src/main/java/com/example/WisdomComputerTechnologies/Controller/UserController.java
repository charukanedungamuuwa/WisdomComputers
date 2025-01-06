package com.example.WisdomComputerTechnologies.Controller;

import com.example.WisdomComputerTechnologies.Model.AuthRequest;
import com.example.WisdomComputerTechnologies.Model.UserInfo;
import com.example.WisdomComputerTechnologies.Services.JwtService;
import com.example.WisdomComputerTechnologies.Services.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/auth")

public class UserController {

    @Autowired
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }

    @PostMapping("/addNewUser")
    public String addNewUser(@RequestBody UserInfo userInfo) {
        return service.addUser(userInfo);
    }

    @GetMapping("/user/userProfile")
  //@PreAuthorize("hasAuthority('ROLE_USER')")
    public String userProfile() {
        return "Welcome to User Profile";
    }

    @GetMapping("/admin/adminProfile")
 //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String adminProfile() {
        return "Welcome to Admin Profile";
    }


    @PostMapping("/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );
        if (authentication.isAuthenticated()) {
            System.out.println("User authenticated: " + authRequest.getUsername());

            // Generate token with user details
            return jwtService.generateToken((UserDetails) authentication.getPrincipal()); // Pass UserDetails here
        } else {
            System.out.println("Authentication failed for user: " + authRequest.getUsername());
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }
    @GetMapping
    public List<UserInfo> getAllUsers() {
        return service.getAllUsers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public UserInfo getUserById(@PathVariable int id) {
        return service.getUserById(id);
    }

    // Delete user by ID
    @DeleteMapping("/{id}")
    public String deleteUserById(@PathVariable int id) {
        return service.deleteUserById(id);
    }

    // Update user by ID
    @PutMapping("/{id}")
    public UserInfo updateUserById(@PathVariable int id, @RequestBody UserInfo updatedUser) {
        return service.updateUserById(id, updatedUser);
    }

}
