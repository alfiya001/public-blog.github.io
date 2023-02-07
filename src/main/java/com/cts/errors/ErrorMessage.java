package com.cts.errors;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Builder;
import lombok.Getter;

@Builder
public class ErrorMessage {
	
	@Getter
	private String message;
	
	@JsonInclude(value = Include.CUSTOM)
	@Getter
	private List<String> errors;
}
