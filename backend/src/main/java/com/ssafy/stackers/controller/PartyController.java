package com.ssafy.stackers.controller;

import com.ssafy.stackers.model.Instrument;
import com.ssafy.stackers.model.Party;
import com.ssafy.stackers.service.PartyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "party", description = "그룹 관련 API")
@RestController
@RequestMapping("api/party")
public class PartyController {

    @Autowired
    private PartyService partyService;

    @Operation(summary = "그룹 추가")
    @PostMapping
    public ResponseEntity<?> createParty(@RequestBody Party party) {
        partyService.save(party.getName());
        return new ResponseEntity<>("그룹 생성 완료!\uD83D\uDE0D", HttpStatus.OK);
    }

    @Operation(summary = "그룹 삭제")
    @DeleteMapping
    public ResponseEntity<?> createInstrument(@RequestBody Instrument instrument) {
        partyService.delete(instrument.getName());
        return new ResponseEntity<>("그룹 삭제 완료!\uD83D\uDE0D", HttpStatus.OK);
    }
}
