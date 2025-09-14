import React, { useEffect, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import PersonalStep from "../components/join/PersonalStep";
import HRStep from "../components/join/HRStep";
import Commite from "../components/join/Commite";
import ReviewSubmit from "../components/join/ReviewSubmit";
import ProgressBar from "../components/join/ProgressBar";
import AnimatedBackground3D from "../components/join/AnimatedBackground";
import HiddenAfterCommite from "../components/join/HiddenAfterCommite";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/JoinUs.css";

// ✅ Schema validation
const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^(?:\+20|0)?1[0-9]{9}$/, "Invalid Egyptian phone number"),
  nationalId: yup
    .string()
    .required("National ID is required")
    .matches(/^[0-9]{14}$/, "National ID must be exactly 14 digits"),
  university: yup.string().required("University is required"),
  faculty: yup.string().required("Faculty / Department is required"),
  academicYear: yup.string().required("Academic year is required"),
  dateOfBirth: yup
    .date()
    .typeError("Please select a valid date")
    .required("Date of birth is required"),
  address: yup.string().required("Address is required"),
  gender: yup.string().required("Please select your gender"),
  linkedIn: yup.string().url("LinkedIn must be a valid URL"),
  facebook: yup
    .string()
    .url("Facebook must be a valid URL")
    .nullable()
    .notRequired(),
});

export default function JoinUs() {
  // load saved values
  const saved =
    typeof window !== "undefined" && localStorage.getItem("joinForm")
      ? JSON.parse(localStorage.getItem("joinForm"))
      : {};

  const methods = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      university: "",
      year: "",
      cv: null,
      department: "",
      roles: [],
      skills: [],
      whyJoin: "",
      prevExp: "",
      ...saved,
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // 🟢 الخطوات اللي بتظهر في البروجريس بار
  const visibleSteps = ["Personal", "HR", "Commite", "Submit"];

  // 🟢 كل الخطوات (بما فيها المخفية)
  const allSteps = [
    "Personal",
    "HR",
    "Commite",
    "HiddenAfterCommite",
    "Submit",
  ];

  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem("joinForm", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const currentStep = allSteps[stepIndex];

  const next = async () => {
    const valid = await methods.trigger();
    if (!valid) return;
    setDirection(1);
    setStepIndex((s) => Math.min(s + 1, allSteps.length - 1));
  };

  const back = () => {
    setDirection(-1);
    setStepIndex((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = (data) => {
    // جلب البيانات السابقة
    const savedResponses = JSON.parse(
      localStorage.getItem("responses") || "[]"
    );

    // أضف البيانات الجديدة
    savedResponses.push(data);

    // حفظها مرة أخرى
    localStorage.setItem("responses", JSON.stringify(savedResponses));

    // مسح الفورم الحالي
    methods.reset();
    setStepIndex(0);

    alert("Your application has been saved locally!");
  };
  const downloadResponses = () => {
    const savedResponses = JSON.parse(
      localStorage.getItem("responses") || "[]"
    );
    const blob = new Blob([JSON.stringify(savedResponses, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "responses.json"; // اسم الملف
    a.click();

    URL.revokeObjectURL(url);
  };

  // 🔥 Animations
  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.4 },
    }),
  };

  const renderStep = () => {
    switch (currentStep) {
      case "Personal":
        return <PersonalStep />;
      case "HR":
        return <HRStep />;
      case "Commite":
        return <Commite />;
      case "HiddenAfterCommite":
        return <HiddenAfterCommite />;
      case "Submit":
        return <ReviewSubmit onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <motion.div className="join-page">
         <Header/>
        <AnimatedBackground3D />
        <motion.div
          className="join-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="join-header">
            <h1 className="join-title">Join Us</h1>
            <div className="logo-circle">
              <img
                src="/img/logo-1.png"
                alt="IEEE Logo"
                className="join-logo"
              />
            </div>
          </div>
          {/* ProgressBar with only visibleSteps */}

          <ProgressBar
            steps={visibleSteps} // لعرض الأسماء فقط
            currentIndex={stepIndex} // عدد كل الخطوات (allSteps) للحساب
            totalSteps={allSteps.length} // مرجع لحساب النسبة
          />
          <div className="step-content" style={{ position: "relative" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="controls">
            {stepIndex > 0 && (
              <button className="btn secondary" onClick={back}>
                Back
              </button>
            )}

            {currentStep !== "Submit" ? (
              <button className="btn primary" onClick={next}>
                Next
              </button>
            ) : (
              <>
                {/* زر Submit */}
                <button
                  className="btn primary"
                  onClick={methods.handleSubmit(handleSubmit)}
                >
                  Submit Application
                </button>

                {/* زر Download JSON */}
                <button
                  className="btn secondary"
                  onClick={downloadResponses}
                  style={{ marginLeft: "10px" }}
                >
                  Download All Responses
                </button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
      <Footer/>
    </FormProvider>
  );
}
