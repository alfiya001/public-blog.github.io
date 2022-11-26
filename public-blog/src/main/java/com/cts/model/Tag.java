package com.cts.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tag {

		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private Long id;
		
		private String name;
		
		@JsonIgnore
		@ManyToMany(mappedBy = "tags", fetch = FetchType.EAGER)
		private List<Post> posts;
}
