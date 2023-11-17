import loadable from '@loadable/component'; // 지연 로딩

const Message = loadable(() => import('../commons/Message'));

const ErrorMessages = ({ errors, field }) => {
  return (
    errors &&
    errors[field] &&
    errors[field].map((s, i) => <Message key={`${field}_${i}`}>{s}</Message>)
  );
};

export default ErrorMessages;
