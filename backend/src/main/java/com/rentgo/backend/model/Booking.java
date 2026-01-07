package com.rentgo.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne(fetch = FetchType.EAGER) // EAGER fetch to include car details
    @JoinColumn(name = "car_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Fix for JSON serialization
    private Car car;

    private Long userId;

    // New fields for payment and document uploads

    private String licenceDocument;  // Stored file path or URL
    private LocalDate licenceExpiryDate;

    private String idProofDocument;  // Stored file path or URL
    private String idProofType;      // e.g., "Aadhaar", "Passport", "Visa"
    private String idProofNumber;

    private boolean damageConsent;   // Terms checkbox

    private String paymentMethod;    // Card, UPI, Bank
    private String paymentStatus;    // e.g., PENDING, SUCCESS, FAILED

    public Booking() {}

    public Booking(LocalDate startDate, LocalDate endDate, Car car, Long userId) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.car = car;
        this.userId = userId;
    }

    // Getters and setters for existing fields
    public Long getId() {
        return id;
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

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // Getters and setters for new fields
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
