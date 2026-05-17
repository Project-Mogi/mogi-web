import { type SignInData, type SignInRequest } from '@/entities/auth/model';
import { mockDelay } from '@/shared/lib/mockDelay';

const MOCK_USERS: Array<SignInData & { password: string }> = [
  {
    id: 1,
    username: 'housemaster',
    password: 'mogi1234',
    email: 'housemaster@mogi.local',
    name: '사감선생님',
    role: 'HOUSEMASTER',
    accessToken: 'mock-access-token-housemaster',
    refreshToken: 'mock-refresh-token-housemaster',
  },
  {
    id: 2,
    username: 'autonomy',
    password: 'mogi1234',
    email: 'autonomy@mogi.local',
    name: '자치위원',
    role: 'AUTONOMY',
    accessToken: 'mock-access-token-autonomy',
    refreshToken: 'mock-refresh-token-autonomy',
  },
];

export async function signInWithMock({ username, password }: SignInRequest) {
  await mockDelay(400);

  const user = MOCK_USERS.find(
    (mockUser) => mockUser.username === username && mockUser.password === password,
  );

  if (!user) {
    throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
  };
}
