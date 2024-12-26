package com.example.WisdomComputerTechnologies.Services;

import com.example.WisdomComputerTechnologies.DAO.UserInfoDAO;
import com.example.WisdomComputerTechnologies.Model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Lazy
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserInfoDAO userInfoDAO;

    @Autowired
    private PasswordEncoder encoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserInfo> userDetail = userInfoDAO.findByEmail(username); // Assuming 'email' is used as username
        //Optional<UserInfo> userDetail = userInfoDAO.findByName(username); // Assuming 'email' is used as username

        // Converting UserInfo to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public String addUser(UserInfo userInfo) {
        // Encode password before saving the user
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        userInfoDAO.save(userInfo);
        return "User Added Successfully";
    }



    public List<UserInfo> getAllUsers() {
        return userInfoDAO.findAll();
    }

    // Get user by ID
    public UserInfo getUserById(int id) {
        return userInfoDAO.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + id));
    }

    // Delete user by ID
    public String deleteUserById(int id) {
        if (userInfoDAO.existsById(id)) {
            userInfoDAO.deleteById(id);
            return "User deleted successfully.";
        } else {
            throw new UsernameNotFoundException("User not found with ID: " + id);
        }
    }

    // Update user by ID
    public UserInfo updateUserById(int id, UserInfo updatedUser) {
        return userInfoDAO.findById(id)
                .map(existingUser -> {
                    existingUser.setName(updatedUser.getName());
                    existingUser.setEmail(updatedUser.getEmail());
                    existingUser.setPassword(encoder.encode(updatedUser.getPassword()));
                    existingUser.setRoles(updatedUser.getRoles());
                    return userInfoDAO.save(existingUser);
                })
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + id));
    }

    // Add user (already implemented in your existing code)

}
