import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
} from "@react-email/components"

export default function OtpEmail({
  name = "User",
  otp = "123456",
  appName = "Billing App",
  supportEmail = "support@billingapp.com",
}) {
  return (
    <Html>
      <Head />
      <Preview>
        Your OTP to verify your {appName} account
      </Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.section}>
            <Heading style={styles.heading}>
              Verify Your Email
            </Heading>

            <Text style={styles.text}>
              Hello {name},
            </Text>

            <Text style={styles.text}>
              We received a request to create or verify your account on{" "}
              <strong>{appName}</strong>.
            </Text>

            <Text style={styles.text}>
              Use the OTP below to continue:
            </Text>

            <Section style={styles.otpBox}>
              <Text style={styles.otp}>{otp}</Text>
            </Section>

            <Text style={styles.subText}>
              This OTP is valid for <strong>5 minutes</strong>.
              <br />
              Please do not share this code with anyone.
            </Text>

            <Text style={styles.subText}>
              If you did not request this verification, you can safely ignore this email.
            </Text>

            <Text style={styles.footer}>
              Thanks for choosing <strong>{appName}</strong>.<br />
              — The {appName} Team<br />
              <a href={`mailto:${supportEmail}`} style={styles.link}>
                {supportEmail}
              </a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const styles = {
  body: {
    backgroundColor: "#f4f4f5",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    margin: "40px auto",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    maxWidth: "480px",
  },
  section: {
    padding: "32px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#111827",
  },
  text: {
    fontSize: "14px",
    color: "#374151",
    lineHeight: "22px",
  },
  otpBox: {
    margin: "24px auto",
    textAlign: "center",
  },
  otp: {
    display: "inline-block",
    padding: "14px 28px",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    fontSize: "28px",
    letterSpacing: "6px",
    fontWeight: "600",
    color: "#111827",
  },
  subText: {
    fontSize: "12px",
    color: "#6b7280",
    lineHeight: "18px",
  },
  footer: {
    marginTop: "28px",
    fontSize: "12px",
    color: "#9ca3af",
    textAlign: "center",
  },
  link: {
    color: "#4f46e5",
    textDecoration: "none",
  },
}
