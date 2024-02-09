interface EmailTemplateProps {
	subjectLabel: string;
	requiredLink: string;
	taskLabel: string;
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	subjectLabel,
	requiredLink,
	taskLabel,
}) => {
	return (
		<div>
			<h1>{subjectLabel}</h1>
			<p>Hi there,</p>
			<p>
				Please click the link below to complete your {taskLabel}{" "}
				request.
			</p>
			<p>
				<a href={requiredLink}>
					<button>{taskLabel}</button>
				</a>
			</p>
			<p>
				If you are not able to view the above link, copy and paste the
				below link in any web browser.
			</p>
			<p>
				<a href={requiredLink}>{requiredLink}</a>
			</p>
			<p>For security reasons, this link will expire in 1 hour.</p>
			<p>Best regards,</p>
			<p>Team Organizer</p>
		</div>
	);
};

export default EmailTemplate;
