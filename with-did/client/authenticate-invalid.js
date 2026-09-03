import axios from "axios";

const API_URL = "http://localhost:8080";

// Test 1: Non-existent student DID
const testNonExistentDID = async () => {
    console.log("\n=== Test 1: Non-existent Student DID ===");
    try {
        const response = await axios.post(
            `${API_URL}/api/did/authenticate/challenge`,
            {
                did: "did:example:nonexistent123456789"
            }
        );
        console.log("❌ FAILED: Should have rejected non-existent DID");
        console.log("Response:", response.data);
    } catch (error) {
        console.log("✅ PASSED: Rejected non-existent DID");
        console.log("Error:", error.response?.data?.error || error.message);
    }
};

// Test 2: Invalid DID format
const testInvalidDIDFormat = async () => {
    console.log("\n=== Test 2: Invalid DID Format ===");
    try {
        const response = await axios.post(
            `${API_URL}/api/did/authenticate/challenge`,
            {
                did: "invalid-did-format"
            }
        );
        console.log("❌ FAILED: Should have rejected invalid DID format");
        console.log("Response:", response.data);
    } catch (error) {
        console.log("✅ PASSED: Rejected invalid DID format");
        console.log("Error:", error.response?.data?.error || error.message);
    }
};

// Test 3: Missing DID in request
const testMissingDID = async () => {
    console.log("\n=== Test 3: Missing DID in Request ===");
    try {
        const response = await axios.post(
            `${API_URL}/api/did/authenticate/challenge`,
            {}
        );
        console.log("❌ FAILED: Should have rejected missing DID");
        console.log("Response:", response.data);
    } catch (error) {
        console.log("✅ PASSED: Rejected missing DID");
        console.log("Error:", error.response?.data?.error || error.message);
    }
};

// Test 4: Invalid signature verification
const testInvalidSignature = async () => {
    console.log("\n=== Test 4: Invalid Signature ===");
    try {
        const response = await axios.post(
            `${API_URL}/api/did/authenticate/verify`,
            {
                did: "did:example:test123",
                challenge: "some-challenge",
                signature: "invalid-signature-xyz"
            }
        );
        console.log("❌ FAILED: Should have rejected invalid signature");
        console.log("Response:", response.data);
    } catch (error) {
        console.log("✅ PASSED: Rejected invalid signature");
        console.log("Error:", error.response?.data?.error || error.message);
    }
};

// Test 5: Tampered challenge
const testTamperedChallenge = async () => {
    console.log("\n=== Test 5: Tampered Challenge ===");
    try {
        const response = await axios.post(
            `${API_URL}/api/did/authenticate/verify`,
            {
                did: "did:example:test123",
                challenge: "original-challenge",
                signature: "signature-for-different-challenge"
            }
        );
        console.log("❌ FAILED: Should have rejected tampered challenge");
        console.log("Response:", response.data);
    } catch (error) {
        console.log("✅ PASSED: Rejected tampered challenge");
        console.log("Error:", error.response?.data?.error || error.message);
    }
};

// Run all tests
const runAllTests = async () => {
    console.log("🧪 Running DID Authentication Invalid Tests...");
    
    await testNonExistentDID();
    await testInvalidDIDFormat();
    await testMissingDID();
    await testInvalidSignature();
    await testTamperedChallenge();
    
    console.log("\n✅ All invalid authentication tests completed!");
};

runAllTests();
