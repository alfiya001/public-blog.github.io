package com.cts.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


//**********************************************Post Entity class created By Alfiya Khan**********************************
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
@DynamicUpdate
public class Post extends AuditModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

//	@ManyToOne
//	@JoinColumn(name = "user_id")
	@ManyToOne(fetch = FetchType.EAGER)
//	@JsonIgnore
	private AppUser user;

	@NotNull
	private String title;

	@NotNull
	@Size(max = 2000)
	private String description;

//	@JsonIgnore
//	@ToStringExclude
	@OneToMany(cascade=CascadeType.REMOVE,
//            fetch = FetchType.LAZY,
//            orphanRemoval = true,
            mappedBy = "post")
	private List<Comment> comments;

//	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
//	private List<Comment> comments;

//	@JsonIgnore
//	@ToStringExclude
	@ManyToMany
	@JoinTable(name = "posttag", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
	private List<Tag> tags;

	
//	@JsonIgnore
//	@ToStringExclude
//	@OneToMany(cascade = CascadeType.ALL,
//				orphanRemoval = true,
////            fetch = FetchType.LAZY,
//            mappedBy = "post")
//	private List<LikePost> likePosts;

	// getters and setters
	public void addTag(Tag tag) {
		this.tags.add(tag);
		tag.getPosts().add(this);
	}

	public void removeTag(long tagId) {
		Tag tag = this.tags.stream().filter(t -> t.getId() == tagId).findFirst().orElse(null);
		if (tag != null)
			this.tags.remove(tag);
		tag.getPosts().remove(this);
	}
}
