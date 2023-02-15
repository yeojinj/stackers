package com.ssafy.stackers.service;

import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.model.dto.SearchMemberDto;
import com.ssafy.stackers.model.dto.SearchResultDto;
import com.ssafy.stackers.model.dto.SearchStationDto;
import com.ssafy.stackers.repository.MemberRepository;
import com.ssafy.stackers.repository.StationRepository;

import java.util.ArrayList;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
public class SearchService {
    @Autowired
    private StationRepository stationRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private TagService tagService;
    @Autowired
    private TagListService tagListService;
    @Autowired
    private PartyMemberService partyMemberService;

    public SearchResultDto searchStation(String keyword) {
        // station을 음악으로 검색
        List<Station> stations = stationRepository.findByContentContainingOrMusicContainingOrderByHeartCntDesc(keyword, keyword);
        List<SearchStationDto> stationList = new ArrayList<>();
        if (!stations.isEmpty()) {
            log.info("검색된 스테이션 수: " + stations.size());
            for (int i = 0; i < stations.size() && i < 20; i++) {       // 상위 20개 조회
                Station s = stations.get(i);
                List<String> tags = tagService.findNameById(tagListService.findByStation(s));
                stationList.add(new SearchStationDto(s.getId(), s.getContent(), tags, s.getVideo(), s.getHeartCnt(), s.isComplete(), s.getMember().getId(), s.getMember().getImgPath(), s.getMember().getUsername()));
            }
        }

        // member를 username, nickname으로 검색
        List<Member> members = memberRepository.findByUsernameContainingOrNicknameContaining(keyword, keyword);
        List<SearchMemberDto> memberList = new ArrayList<>();
        if (!members.isEmpty()) {
            log.info("검색된 멤버 수: " + members.size());
            for (int i = 0; i < members.size() && i < 20; i++) {        // 상위 20개 조회
                Member m = members.get(i);
                String teamName = partyMemberService.getParty(m.getId());
                memberList.add(new SearchMemberDto(m.getId(), m.getImgPath(), m.getUsername(), m.getNickname(), teamName));
            }
        }

        // 검색 결과 반환
        SearchResultDto searchResultDto = new SearchResultDto(stationList, memberList);
        return searchResultDto;
    }

}
