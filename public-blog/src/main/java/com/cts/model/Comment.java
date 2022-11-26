package com.cts.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper=true)
public class Comment extends AuditModel {

		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private Long id;
		
		private String comment;
		
		//Reference to post id is Post table
		@JsonIgnore
		@ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "post_id", nullable = false)
		private Post post;
		
		//Reference to User id in user table
		@ManyToOne
		@JoinColumn(name = "user_id")
		private AppUser user;
		
//		@Temporal(TemporalType.TIMESTAMP)
//	    @Column(name = "created_at", nullable = false, updatable = false)
//	    @CreatedDate
//	    private Date createdAt;
//
//	    @Temporal(TemporalType.TIMESTAMP)
//	    @Column(name = "updated_at", nullable = false)
//	    @LastModifiedDate
//	    private Date updatedAt;

}
