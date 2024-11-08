import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function Resume() {
  const [formData, setformData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Education: "",
    Experience: "",
    Skills: "",
  });

  const resumeRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const downloadPDF = async (e) => {
    e.preventDefault();

    const resume = resumeRef.current;
    const canvas = await html2canvas(resume, {
      scale: 2, // Increases the resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`${formData.Name ? formData.Name.replace(/\s+/g, '_') : 'resume'}.pdf`);
  };

  return (
    <>
      <h2 className='text-black text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 mb-4'>Resume Builder</h2>
      <div className="container border-2 border-black p-4 flex justify-between gap-4 bg-gray-100 shadow-lg">

        {/* Resume Form */}
        <div className="resume-form-container shadow-md bg-white rounded-md p-4 max-w-xl w-full">
          <form onSubmit={downloadPDF} className='flex text-black flex-col gap-4'>
            {/* Name */}
            <label htmlFor="name" className='p-2 font-semibold text-lg text-gray-700'>Name: </label>
            <input
              type="text"
              id="name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
              className='border-2 border-gray-400 rounded p-2 focus:outline-none focus:border-blue-500' />

            {/* Email */}
            <label htmlFor="email" className='p-2 font-semibold text-lg text-gray-700'>Email:</label>
            <input
              type="email"
              id="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
              className='border-2 border-gray-400 rounded p-2 focus:outline-none focus:border-blue-500' />

            {/* Phone */}
            <label htmlFor="phone" className='p-2 font-semibold text-lg text-gray-700'>Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              required
              className='border-2 border-gray-400 rounded p-2 focus:outline-none focus:border-blue-500' />

            {/* Education */}
            <label htmlFor="education" className='p-2 font-semibold text-lg text-gray-700'>Education:</label>
            <textarea
              id="education"
              name="Education"
              value={formData.Education}
              onChange={handleChange}
              required
              className='border-2 border-gray-400 rounded p-2 focus:outline-none focus:border-blue-500' />

            {/* Experience */}
            <label htmlFor="experience" className='p-2 font-semibold text-lg text-gray-700'>Experience:</label>
            <textarea
              id="experience"
              name="Experience"
              value={formData.Experience}
              onChange={handleChange}
              className='border-2 border-gray-400 rounded p-2 focus:outline-none focus:border-blue-500' />

            {/* Skills */}
            <label htmlFor="skills" className='p-2 font-semibold text-lg text-gray-700'>Skills:</label>
            <textarea
              id="skills"
              name="Skills"
              value={formData.Skills}
              onChange={handleChange}
              className='border-2 border-gray-400 rounded p-2 focus:outline-none focus:border-blue-500' />

            {/* Submit Button */}
            <button type="submit" className='mx-auto mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:bg-purple-700'>
              Download PDF
            </button>
          </form>
        </div>

        {/* Resume Display */}
        <div ref={resumeRef} className="resume p-4 border-2 max-w-screen-lg w-[80%] rounded-md bg-white shadow-md flex flex-col">
          <div className="info flex justify-between">
            {formData.Name ?
              <h1 className='text-black p-2 text-3xl font-bold '>{formData.Name}</h1>
              : <h1 className='text-gray-500 p-2 text-xl'>Name: </h1>}

            {formData.Email ?
              <h1 className='text-black p-2 text-xl font-semibold'>{formData.Email}</h1>
              : <h1 className='text-gray-500 p-2 text-xl'>Email: </h1>}
          </div>

          {formData.Phone ?
            <h1 className='text-black p-2 text-lg font-semibold'>+91-{formData.Phone}</h1>
            : <h1 className='text-gray-500 p-2 text-xl'>Phone: </h1>}

          <div className="underline border border-b-1 w-full my-2 border-gray-700"></div>

          <div className="background-info h-full m-1 flex justify-between text-black">
            <div className="info-column flex flex-col">

              {/* Education */}
              <div className="facts p-4 ml-12">
                {formData.Education ?
                  <div>
                    <h3 className='font-bold text-xl text-blue-600'>Education</h3>
                    <p className='max-w-xl w-full text-ellipsis pt-2 pb-2 mt-2 whitespace-pre-wrap'>{formData.Education}</p>
                  </div>
                  : <div>
                    <h3 className='font-bold text-xl text-gray-500'>Education</h3>
                  </div>}
              </div>

              {/* Experience */}
              <div className="experience p-4 ml-12 mt-12">
                {formData.Experience ?
                  <div>
                    <h3 className='font-bold text-xl text-blue-600'>Experience</h3>
                    <p className='max-w-xl w-full text-ellipsis pt-2 pb-2 mt-2 whitespace-pre-wrap'>{formData.Experience}</p>
                  </div>
                  : <div>
                    <h3 className='font-bold text-xl text-gray-500'>Experience</h3>
                  </div>}
              </div>
            </div>

            <div className="skills p-4 mr-16 flex flex-col text-black">
              {formData.Skills ?
                <div>
                  <h3 className='font-bold text-xl text-blue-600'>Skills</h3>
                  <span className='max-w-xl w-full text-ellipsis pt-2 pb-2 mt-2 whitespace-pre-wrap'>{formData.Skills}</span>
                </div>
                : <div>
                  <h3 className='font-bold text-xl text-gray-500'>Skills</h3>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Resume;
