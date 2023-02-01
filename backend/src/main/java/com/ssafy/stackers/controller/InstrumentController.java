package com.ssafy.stackers.controller;

import com.ssafy.stackers.model.Instrument;
import com.ssafy.stackers.service.InstrumentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("instrument")
public class InstrumentController {

    @Autowired
    private InstrumentService instrumentService;

    @PostMapping
    public ResponseEntity<?> createInstrument(@RequestBody Instrument instrument) {
        instrumentService.save(instrument);
        return new ResponseEntity<>("악기 생성 완료!\uD83D\uDE0D", HttpStatus.OK);
    }
}
