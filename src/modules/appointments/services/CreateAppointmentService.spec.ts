import AppError from '@shared/infra/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12314129812',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12314129812');
  });

  it('should not be able to create two appointments at same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '12314129812',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '12314129812',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
