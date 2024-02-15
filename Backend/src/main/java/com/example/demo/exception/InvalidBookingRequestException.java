package com.example.demo.exception;

/**
 * @author Simpson Alfred
 */

public class InvalidBookingRequestException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InvalidBookingRequestException(String message) {
        super(message);
    }
}
