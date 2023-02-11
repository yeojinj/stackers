package com.ssafy.stackers.controller;

import com.ssafy.stackers.model.Instrument;
import com.ssafy.stackers.service.InstrumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Tag(name = "Instrument", description = "악기 관련 API")
@RestController
@RequestMapping("api/instrument")
public class InstrumentController {

    @Autowired
    private InstrumentService instrumentService;

    @Operation(summary = "악기 업로드")
    @PostMapping
    public ResponseEntity<?> createInstrument(@RequestBody Instrument instrument) {
        instrumentService.addInstrument(instrument.getName());
        return new ResponseEntity<>("악기 생성 완료!\uD83D\uDE0D", HttpStatus.OK);
    }

    @Operation(summary = "악기 리스트 조회")
    @GetMapping
    public List<Instrument> getInstrument(){
        return instrumentService.getInstrument();
    }
}
