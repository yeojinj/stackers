package com.ssafy.stackers.service;

import com.ssafy.stackers.model.Comment;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.model.dto.CommentDetailDto;
import com.ssafy.stackers.repository.CommentRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private MemberService memberService;

    @Transactional
    public void save(Comment comment) {
        commentRepository.save(comment);
    }

    @Transactional
    public boolean delete(Long id) {
        try {
            commentRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<CommentDetailDto> getComments(Station station) {
        List<Comment> commentEntities = commentRepository.findByStation(station);
        List<CommentDetailDto> comments = new ArrayList<>();

        for (int i = 0; i < commentEntities.size(); i++) {
            Comment c = commentEntities.get(i);
            Member commenter = memberService.findById(c.getMember().getId());
            comments.add(new CommentDetailDto(c.getId(), commenter.getUsername(), commenter.getImgPath(), c.getContent(), c.getRegTime()));
        }

        return comments;
    }

}
