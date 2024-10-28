import React, { useState } from 'react';

const TestPaperComponent = () => {
  const [formData, setFormData] = useState({
    gender: '',
    ageRange: '',
    maritalStatus: '',
    incomeRange: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5 p-4 shadow-lg rounded" style={{ maxWidth: '600px', backgroundColor: '#f8f9fa' }}>
      <h4 className="text-center ">Test Name - </h4>
      <h4 className="text-center mb-4">Department - </h4>
      <p className="text-center mb-4">Please take a few minutes to tell us more about you and your preferences</p>
      <form>
        <div className="mb-4">
          <label className="form-label"><strong>What is your gender?</strong></label>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="gender" value="female" onChange={handleChange} />
            <label className="form-check-label">Female</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="gender" value="male" onChange={handleChange} />
            <label className="form-check-label">Male</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="gender" value="non-binary" onChange={handleChange} />
            <label className="form-check-label">Non-binary</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="gender" value="prefer-not-to-answer" onChange={handleChange} />
            <label className="form-check-label">Prefer not to answer</label>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label"><strong>What is your age range?</strong></label>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="ageRange" value="0-17" onChange={handleChange} />
            <label className="form-check-label">0-17</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="ageRange" value="18-24" onChange={handleChange} />
            <label className="form-check-label">18-24</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="ageRange" value="25-34" onChange={handleChange} />
            <label className="form-check-label">25-34</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="ageRange" value="35-44" onChange={handleChange} />
            <label className="form-check-label">35-44</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="ageRange" value="45-54" onChange={handleChange} />
            <label className="form-check-label">45-54</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="ageRange" value="55-64" onChange={handleChange} />
            <label className="form-check-label">55-64</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="ageRange" value="65+" onChange={handleChange} />
            <label className="form-check-label">65+</label>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label"><strong>What is your marital status?</strong></label>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="maritalStatus" value="single" onChange={handleChange} />
            <label className="form-check-label">Single</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="maritalStatus" value="married" onChange={handleChange} />
            <label className="form-check-label">Married</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="maritalStatus" value="divorced" onChange={handleChange} />
            <label className="form-check-label">Divorced</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="maritalStatus" value="widowed" onChange={handleChange} />
            <label className="form-check-label">Widowed</label>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label"><strong>What is your annual income range?</strong></label>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="incomeRange" value="$9,999 or less" onChange={handleChange} />
            <label className="form-check-label">$9,999 or less</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="incomeRange" value="$10,000-$24,999" onChange={handleChange} />
            <label className="form-check-label">$10,000-$24,999</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="incomeRange" value="$25,000-$49,999" onChange={handleChange} />
            <label className="form-check-label">$25,000-$49,999</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="incomeRange" value="$50,000-$74,999" onChange={handleChange} />
            <label className="form-check-label">$50,000-$74,999</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="incomeRange" value="$75,000-$99,999" onChange={handleChange} />
            <label className="form-check-label">$75,000-$99,999</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default TestPaperComponent;
