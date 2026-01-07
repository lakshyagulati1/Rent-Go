package com.rentgo.backend.dto;

import java.time.LocalDate;

public class BookingDTO {
    private Long carId;
    private Long userId;
    private LocalDate startDate;
    private LocalDate endDate;

    private String licenceDocument;
    private LocalDate licenceExpiryDate;

    private String idProofDocument;
    private String idProofType;
    private String idProofNumber;

    private boolean damageConsent;

    private String paymentMethod;
    private String paymentStatus;

    // Getters and Setters
    public Long getCarId() {
        return carId;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getLicenceDocument() {
        return licenceDocument;
    }

    public void setLicenceDocument(String licenceDocument) {
        this.licenceDocument = licenceDocument;
    }

    public LocalDate getLicenceExpiryDate() {
        return licenceExpiryDate;
    }

    public void setLicenceExpiryDate(LocalDate licenceExpiryDate) {
        this.licenceExpiryDate = licenceExpiryDate;
    }

    public String getIdProofDocument() {
        return idProofDocument;
    }

    public void setIdProofDocument(String idProofDocument) {
        this.idProofDocument = idProofDocument;
    }

    public String getIdProofType() {
        return idProofType;
    }

    public void setIdProofType(String idProofType) {
        this.idProofType = idProofType;
    }

    public String getIdProofNumber() {
        return idProofNumber;
    }

    public void setIdProofNumber(String idProofNumber) {
        this.idProofNumber = idProofNumber;
    }

    public boolean isDamageConsent() {
        return damageConsent;
    }

    public void setDamageConsent(boolean damageConsent) {
        this.damageConsent = damageConsent;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
