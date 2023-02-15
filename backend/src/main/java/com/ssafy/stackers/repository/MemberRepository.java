package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Member;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByUsernameAndEmail(String username, String email);

    List<Member> findByUsernameContainingOrNicknameContaining(String keyword1, String keyword2);

    @Modifying
    @Transactional
    @Query("update Member m set m.lastLogin = now() where m.username = ?1")
    int setLastLogin(String username);
}
