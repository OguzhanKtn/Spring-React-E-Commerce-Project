package com.works.repositories;

import com.works.entities.User;
import com.works.entities.projections.IUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmailEqualsIgnoreCase(String email);

    Optional<User> findByEmailEqualsIgnoreCase(String email);

    @Query(value = "select u.uid, r.name from user as u inner join user_roles as ur on \n" +
            "u.uid = ur.user_uid inner join role r on ur.roles_rid = r.rid where u.email=?1 and u.password=?2",nativeQuery = true)
    IUser user( String email, String password);

}