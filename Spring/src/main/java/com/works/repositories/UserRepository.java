package com.works.repositories;

import com.works.entities.User;
import com.works.entities.projections.IUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.lang.reflect.Array;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmailEqualsIgnoreCase(String email);

    Optional<User> findByEmailEqualsIgnoreCase(String email);

    @Query(value = "select u.uid ,u.name,u.surname,u.email, u.password, r.role from user as u inner join user_roles ur on u.uid = ur.user_uid inner join\n" +
            "    role r on ur.roles_rid = r.rid where u.email=?1 and u.password=?2",nativeQuery = true)
    IUser user (String mail,String password);


}