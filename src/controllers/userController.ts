import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.ts';
import { eq } from 'drizzle-orm';
import { comparePassword, hashPassword } from '../utils/password.ts';
import { db } from '../db/connection.ts';
import { users } from '../db/schema/index.ts';

export async function getProfile(req: AuthenticatedRequest, res: Response) {
    try {
        const userId = req.user!.id;

        const [user] = await db
            .select({
                id: users.id,
                email: users.email,
                username: users.username,
                createdAt: users.createdAt,
                updatedAt: users.updatedAt,
            })
            .from(users)
            .where(eq(users.id, userId));

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Failed to fetch profile '});
    }
}

export async function updateProfile(req: AuthenticatedRequest, res: Response) {
    try {
        const userId = req.user!.id;
        const { email, username } = req.body;

        const [updatedUser] = await db
            .update(users)
            .set({
                email,
                username,
                updatedAt: new Date(),
            })
            .where(eq(users.id, userId))
            .returning({
                id: users.id,
                email: users.email,
                username: users.username,
                updatedAt: users.updatedAt,
            });

        res.json({
            message: 'Profile updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
}

export async function changePassword(req: AuthenticatedRequest, res: Response) {
    try {
        const userId = req.user!.id;
        const { currentPassword, newPassword } = req.body;

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.id, userId));

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isValidPassword = await comparePassword(
            currentPassword, user.password
        );

        if (!isValidPassword) {
            return res.status(400).json({
                error: 'Current password is incorrect'
            });
        }

        const hashedPassword = await hashPassword(newPassword);

        await db
            .update(users)
            .set({
                password: hashedPassword,
                updatedAt: new Date(),
            })
            .where(eq(users.id, userId));

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Failed to change password '});
    }
}
