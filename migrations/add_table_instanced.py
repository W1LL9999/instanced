from alembic import op
import sqlalchemy as sa

def upgrade():
    op.create_table(
        "instanced_challenge",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("initial", sa.Integer(), nullable=True),
        sa.Column("minimum", sa.Integer(), nullable=True),
        sa.Column("decay", sa.Integer(), nullable=True),
        sa.Column("function", sa.String(32), nullable=True),
        sa.ForeignKeyConstraint(["id"], ["challenges.id"]),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade():
    op.drop_table("instanced_challenge")