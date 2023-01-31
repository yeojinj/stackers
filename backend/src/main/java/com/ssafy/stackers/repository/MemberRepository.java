package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByUsername(String username);

    boolean existsByUsername(String username);
}
