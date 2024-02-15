package com.example.demo.exception;

/**
 * @author Simpson Alfred
 */

public class InternalServerException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InternalServerException(String message) {
        super(message);
    }
}
