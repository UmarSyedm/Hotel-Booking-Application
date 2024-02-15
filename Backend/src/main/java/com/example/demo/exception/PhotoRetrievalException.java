package com.example.demo.exception;

/**
 * @author Simpson Alfred
 */

public class PhotoRetrievalException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public PhotoRetrievalException(String message) {
        super(message);
    }
}
