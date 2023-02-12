package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.RefreshRedisToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshRedisRepository extends CrudRepository<RefreshRedisToken, String> {
}
