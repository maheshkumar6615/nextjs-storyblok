const Theme = ({ theme }: { theme: string }) => {
  return (
    <input type="hidden" value={theme} />
  );
};

export default Theme;