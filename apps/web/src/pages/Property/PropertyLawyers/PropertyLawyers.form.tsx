import { useState } from 'react';
import { Button, Flex, Input } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { EMPTY_STRING, FLEX_GAP_MD, LAWYER_NAME_MIN } from '@const';
import { usePropertyState } from '@hooks';

export function PropertyLawyersForm() {
  const t = useTranslate();
  const { addLawyer } = usePropertyState();
  const [name, setName] = useState(EMPTY_STRING);
  const [city, setCity] = useState(EMPTY_STRING);
  const [specialty, setSpecialty] = useState(EMPTY_STRING);
  const [phone, setPhone] = useState(EMPTY_STRING);
  const [notes, setNotes] = useState(EMPTY_STRING);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(EMPTY_STRING);

  async function submit() {
    if (name.trim().length < LAWYER_NAME_MIN) {
      setError(t('lawyerNameRequired'));
      return;
    }
    setBusy(true);
    setError(EMPTY_STRING);
    try {
      await addLawyer({
        name,
        city: city || null,
        specialty: specialty || null,
        phone: phone || null,
        notes: notes || null,
      });
      setName(EMPTY_STRING);
      setCity(EMPTY_STRING);
      setSpecialty(EMPTY_STRING);
      setPhone(EMPTY_STRING);
      setNotes(EMPTY_STRING);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('genericError'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Flex className="Bear-PropertyLawyersForm Clm-form" direction="column" gap={FLEX_GAP_MD}>
      <Input label={t('lawyerName')} value={name} onChange={(event) => setName(event.target.value)} fullWidth />
      <Input label={t('lawyerCity')} value={city} onChange={(event) => setCity(event.target.value)} fullWidth />
      <Input label={t('lawyerSpecialty')} value={specialty} onChange={(event) => setSpecialty(event.target.value)} fullWidth />
      <Input label={t('lawyerPhone')} value={phone} onChange={(event) => setPhone(event.target.value)} fullWidth />
      <Input label={t('lawyerNotes')} value={notes} onChange={(event) => setNotes(event.target.value)} fullWidth />
      {error ? <p className="Clm-page-sub" role="alert">{error}</p> : null}
      <Button variant="primary" loading={busy} loadingText={t('saving')} onClick={() => void submit()}>
        {t('addLawyer')}
      </Button>
    </Flex>
  );
}
