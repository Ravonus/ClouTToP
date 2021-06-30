import Setting from '../../models/Setting';

export async function deleteConfig(name: string, values: {}) {
  return await Setting.destroy({ where: { name, values } }).catch((e) => {
    error: e;
  });
}
